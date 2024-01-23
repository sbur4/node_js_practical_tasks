import {PrimaryKey, Property} from '@mikro-orm/core';

import {getUniqueID} from "../../core/util/uuid.generator.utils";

export abstract class BaseEntity {
    @PrimaryKey({
        name: 'id', type: 'uuid', primary: true, unique: true, nullable: false, onCreate: () => getUniqueID()
    })
    id: string = getUniqueID();

    @Property({
        name: 'createdAt', type: 'date', primary: false, unique: false, nullable: false,
        onCreate: () => new Date()
    })
    createdAt = new Date();

    @Property({
        name: 'updatedAt', type: 'date', primary: false, unique: false, nullable: false,
        onUpdate: () => new Date()
    })
    updatedAt = new Date();
}