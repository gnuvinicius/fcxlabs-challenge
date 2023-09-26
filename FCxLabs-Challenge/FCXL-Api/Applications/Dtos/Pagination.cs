namespace FCxLabs.Api.Applications.Dtos
{
    public class Pagination
    {
        public int First { get; private set; }
        public int PerPage { get; private set; }
        public int Size { get; private set; }
        public List<UserResponseDto> Result { get; private set; }

        public Pagination(int first, int perPage, int size, List<UserResponseDto> result)
        {
            First = first;
            PerPage = perPage;
            Size = size;
            Result = result;
        }
    }
}
