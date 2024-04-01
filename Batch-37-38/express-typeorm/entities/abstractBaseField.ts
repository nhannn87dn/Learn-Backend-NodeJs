import { Column } from "typeorm"

/**
 * Lớp abstract
 * chứa các Field cơ bản
 */
export abstract class BaseField {
    
    @Column({type: 'bit',default: false})
    isActive: boolean

    @Column({type: 'bit',default: false})
    isDelete: boolean

    @Column({type: 'smallint',default: 50})
    sortOrder: number
}