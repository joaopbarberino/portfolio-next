// https://stackoverflow.com/a/24782004
export function arrayChunk<T>(array: T[], chunkSize: number): T[][] {
    if (chunkSize === 0) throw 'Chunk size must be greater than 0';

    const R = [];
    for (let i = 0, len = array.length; i < len; i += chunkSize) {
        R.push(array.slice(i, i + chunkSize));
    }
    return R;
}