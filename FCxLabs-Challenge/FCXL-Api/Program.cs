using FCxLabs.Api.Domains;
using FCxLabs.Api.Config;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

// dependency injections
builder.Services.ResolveDependences();

builder.Services.AddDbContext<FCxLabsContext>(options => options.UseNpgsql(builder.Configuration["ConnectionStrings:DefaultConnection"]));

builder.Services.AddEndpointsApiExplorer();

builder.Services.ConfigureSwaggerGen();

builder.Services.AuthServices(builder);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

#region configure app

var app = builder.Build();

app.UseSwagger();

app.ConfigureSwaggerUI();

app.UseHsts();

app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapControllers();

// app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.Run();

#endregion