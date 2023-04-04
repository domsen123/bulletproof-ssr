import { v4 as uuidv4 } from 'uuid'
import type { AnyItem, IBase } from '@bulletproof/shared'
import omit from 'lodash/omit'

export const toNewItem = <T = AnyItem>(item: T, accountability = undefined): T & IBase => {
  const newItem: any = {
    id: uuidv4(),
    ...item,
    created_at: new Date(),
    updated_at: new Date(),
  }

  if (accountability) {
    newItem.created_by = accountability
    newItem.updated_by = accountability
  }

  return newItem
}

export const toUpdateItem = <T extends IBase>(item: T, accountability = undefined): Omit<T, 'id'> => {
  const omittedItem = omit(item, ['id', 'updated_at'])
  const updatedItem = {
    ...omittedItem,
    updated_at: new Date(),
  }
  if (accountability)
    updatedItem.updated_at = accountability

  return updatedItem as Omit<T, 'id'>
}
