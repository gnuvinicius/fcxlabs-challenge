using Newtonsoft.Json.Linq;
using System.Runtime.Serialization;

namespace FCxLabs.Api.Domains
{
    public enum Status
    {
        [EnumMember(Value = "Inativo")]
        Inactive = 0,

        [EnumMember(Value = "Ativo")]
        Active = 1,

        [EnumMember(Value = "Bloqueado")]
        Blocked = 2
    }
}
