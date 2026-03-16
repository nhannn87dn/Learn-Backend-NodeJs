import slugify from '@sindresorhus/slugify';

export const buildSlug = (str: string)=>{
    return slugify(str, {
        lowercase: true,
    });

}