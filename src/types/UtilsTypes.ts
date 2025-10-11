//convierte a tipo los valores de un literal inmutale
export type Value<T extends object> = T[keyof T];
export type Parent = { children?: React.ReactNode };
