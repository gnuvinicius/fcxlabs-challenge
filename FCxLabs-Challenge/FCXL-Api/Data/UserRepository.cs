﻿using FCxLabs.Api.Applications.Dtos;
using FCxLabs.Api.Domains;
using Microsoft.EntityFrameworkCore;

namespace FCxLabs.Api.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly FCxLabsContext _context;

        public UserRepository(FCxLabsContext context)
        {
            _context = context;
        }

        public async Task BlockUserById(int id)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception("user not found");
            
            user.BlockUser();
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

        }

        public async Task<User> CreateUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task DeleteUserById(int id)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception("user not found");

            user.InactiveUser();
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User?> FindByUsername(string username)
        {
            return await _context.Users
                    .Where(u => u.Username == username)
                    .FirstOrDefaultAsync();
        }

        public async Task<List<User>> GetAllUsers(FilterRequestDto filter)
        {
            var query = _context.Users.AsQueryable();

            AddNameToFilter(filter, ref query);
            AddCPFToFilter(filter, ref query);
            AddUsernameToFilter(filter, ref query);
            AddStatusToFilter(filter, ref query);
            AddBirtdayToFilter(filter, ref query);
            AddCreatedAtToFilter(filter, ref query);
            AddUpdatedAtToFilter(filter, ref query);
            AddRangeAgeToFilter(filter, ref query);

            AddPagination(filter, ref query);

            return await query.ToListAsync();
        }

        public async Task UpdateUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User?> FindById(int id)
        {
            return await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        #region PRIVATE METHODS

        private static void AddPagination(FilterRequestDto filter, ref IQueryable<User> query)
        {
            query = query.Skip(filter.Page - 1).Take(filter.PerPage);
        }

        private static void AddUsernameToFilter(FilterRequestDto filter, ref IQueryable<User> query)
        {
            if (!string.IsNullOrEmpty(filter.Username))
                query = query.Where(u => u.Username == filter.Username);
        }

        private static void AddNameToFilter(FilterRequestDto filter, ref IQueryable<User> query)
        {
            if (!string.IsNullOrEmpty(filter.Name))
                query = query.Where(u => u.Name == filter.Name);
        }

        private static void AddCPFToFilter(FilterRequestDto filter, ref IQueryable<User> query)
        {
            if (!string.IsNullOrEmpty(filter.CPF))
                query = query.Where(u => u.CPF == filter.CPF);
        }

        private static void AddStatusToFilter(FilterRequestDto filter, ref IQueryable<User> query)
        {
            if (filter.Status == null)
            {
                query = query.Where(u => u.Status == Status.Active);
            }
            else
            {
                query = query.Where(u => u.Status == filter.Status);
            }
        }

        private static void AddCreatedAtToFilter(FilterRequestDto filter, ref IQueryable<User> query)
        {
            if (filter.CreatedAt != null)
                query = query.Where(u => u.CreatedAt == filter.CreatedAt);
        }

        private static void AddBirtdayToFilter(FilterRequestDto filter, ref IQueryable<User> query)
        {
            if (filter.Birtday != null)
                query = query.Where(u => u.Birtday == filter.Birtday);
        }

        private static void AddUpdatedAtToFilter(FilterRequestDto filter, ref IQueryable<User> query)
        {
            if (filter.UpdatedAt != null)
                query = query.Where(u => u.UpdatedAt == filter.UpdatedAt);
        }

        private static void AddRangeAgeToFilter(FilterRequestDto filter, ref IQueryable<User> query)
        {

        }

        #endregion
    }
}