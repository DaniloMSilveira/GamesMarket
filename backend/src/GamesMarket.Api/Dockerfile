FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /out

COPY ["./nuget.config", "."]
COPY ["./src/GamesMarket.Api/GamesMarket.Api.csproj", "src/GamesMarket.Api/"]
COPY ["./src/GamesMarket.Domain/GamesMarket.Domain.csproj", "src/GamesMarket.Domain/"]
COPY ["./src/GamesMarket.Infra/GamesMarket.Infra.csproj", "src/GamesMarket.Infra/"]

RUN dotnet restore "src/GamesMarket.Api/GamesMarket.Api.csproj"
COPY . .
WORKDIR "src/GamesMarket.Api"
RUN dotnet build "GamesMarket.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GamesMarket.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GamesMarket.Api.dll"]

# RUN IN SOLUTION FOLDER
# docker build -t games-market-api:2.0 -f ./src/GamesMarket.Api/Dockerfile .
# docker run --name gamesmarket-api -p 5000:80 games-market-api:2.0