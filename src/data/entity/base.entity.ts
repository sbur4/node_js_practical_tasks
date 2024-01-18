import {PrimaryKey, Property} from '@mikro-orm/core';

import {getUniqueID} from "../../core/util/uuid.generator.utils";

export abstract class BaseEntity {
    @PrimaryKey()
    id: string = getUniqueID();

    @Property({type: 'date'})
    createdAt = new Date();

    @Property({type: 'date', onUpdate: () => new Date()})
    updatedAt = new Date();
}