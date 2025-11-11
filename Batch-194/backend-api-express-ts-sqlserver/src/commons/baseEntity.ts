import { Column } from "typeorm"

export abstract class BaseField {
    
    @Column({type: 'bit'})
    isActive: boolean

    @Column({type: 'bit'})
    isDelete: boolean

    @Column({type: 'smallint'})
    sortOrder: number
}