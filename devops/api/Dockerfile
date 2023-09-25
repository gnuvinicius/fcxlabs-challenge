FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env

WORKDIR /app

RUN git clone https://github.com/gnuvinicius/fcxlabs-challenge.git

WORKDIR /app/fcxlabs-challenge/FCxLabs-Challenge/FCXL-Api

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0

WORKDIR /app/fcxlabs-challenge/FCxLabs-Challenge/FCXL-Api
WORKDIR /app
COPY --from=build-env /app/fcxlabs-challenge/FCxLabs-Challenge/FCXL-Api/out .

EXPOSE 80

ENTRYPOINT ["dotnet", "FCXL-Api.dll"]