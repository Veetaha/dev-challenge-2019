import * as I from '@app/interfaces';
export * from 'ts-typedefs';

export type CoreEntityData<TEntity extends I.Obj> = I.CoreObjData<
    I.RemoveKeys<TEntity, 'id' | 'creationDate' | 'lastUpdateDate'>
>;

export type CoreObjData<TObj extends I.Obj> = I.FilterProps<
    TObj,
    I.Op.Not<I.Op.Extends<I.Func<any, any, TObj>>>
>;