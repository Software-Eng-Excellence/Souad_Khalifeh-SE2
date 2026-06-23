
export interface IMapper<I, O> {
    map(data: I): O;
}
