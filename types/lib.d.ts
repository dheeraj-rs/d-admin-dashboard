export interface ClassDictionary {
    [id: string]: boolean | undefined | null;
}

export type ClassArray = Array<ClassValue>;

export type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null;
