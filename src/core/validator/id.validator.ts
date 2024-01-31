export function idValidator(id: string): boolean {
    return (
        typeof id !== 'string' ||
        id.trim() === '' ||
        id === null ||
        id === undefined
    )
}

export function amountValidator(id: string): boolean {
    return typeof id !== 'number' || isNaN(id)
}

// todo +-
