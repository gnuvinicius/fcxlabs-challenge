namespace FCxLabs.Api.Applications.Dtos
{
    public class Pagination
    {
        public int Page { get; private set; }
        public int PerPage { get; private set; }
        public List<UserResponseDto> Result { get; private set; }

        public Pagination(int page, int perPage, List<UserResponseDto> result)
        {
            this.Page = page;
            this.PerPage = perPage;
            this.Result = result;
        }
    }
}
