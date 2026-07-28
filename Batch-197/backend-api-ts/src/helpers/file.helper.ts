import fs from 'node:fs';

export const readFile = <T = any>(filePath: string): T => {
    try {
        const data = fs.readFileSync(filePath, { encoding: 'utf-8', flag: 'r' });
        let parsed = JSON.parse(data);

        // Nếu kết quả trả về vẫn là một chuỗi (do bị stringify 2 lần lúc ghi), parse thêm 1 lần nữa
        if (typeof parsed === 'string') {
            parsed = JSON.parse(parsed);
        }

        return parsed as T;
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        throw error;
    }   
};

export const writeFile = (filePath: string, data: any): void => {
    try {
        // Kiểm tra nếu data lỡ bị stringify từ trước thì parse lại, hoặc ghi trực tiếp
        const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
        
        fs.writeFileSync(filePath, content, { encoding: 'utf-8', flag: 'w' });
    } catch (error) {
        console.error(`Error writing file to disk: ${error}`);
        throw error;
    }   
};