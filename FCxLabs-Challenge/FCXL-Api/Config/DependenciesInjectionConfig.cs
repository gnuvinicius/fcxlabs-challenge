using FCxLabs.Api.Applications.Services;
using FCxLabs.Api.Data;
using FCxLabs.Api.Domains;

namespace FCxLabs.Api.Config;

internal static class DependenciesInjectionConfig
{
    internal static IServiceCollection ResolveDependences(this IServiceCollection services) {

        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IManagerService, ManagerService>();

        services.AddScoped<IUserRepository, UserRepository>();

        return services;
    }
}