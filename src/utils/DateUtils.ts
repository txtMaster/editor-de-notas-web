export function dateToString(d?: Date): string{
    if(!d) return "";
    return d.toLocaleDateString("es-ES",{
        day:"2-digit",
        month:"long",
        year:"numeric"
    })
}
export function dateToFullString(d?:Date):string{
    if(!d)return "";
    return d.toLocaleDateString("es-ES",{
        day:"2-digit",
        month:"2-digit",
        year:"numeric",
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit"
    })
}