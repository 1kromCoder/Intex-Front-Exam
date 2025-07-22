import type { MetaType } from "./Meta"

export interface ConsultType {
    id: string,
    name: string,
    phone: string,
    createdAt: string,
    updatedAt: string
}

export interface KonsultType {
    data: ConsultType[],
    meta: MetaType
}