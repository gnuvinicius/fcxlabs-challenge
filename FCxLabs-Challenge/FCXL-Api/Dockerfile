FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src

COPY FCXL-Api.csproj .

RUN dotnet restore "FCXL-Api.csproj"

COPY . .

RUN dotnet publish "FCXL-Api.csproj" -c Debug -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final

WORKDIR /app

COPY --from=build /publish .

ENTRYPOINT ["dotnet", "FCXL-Api.dll"]