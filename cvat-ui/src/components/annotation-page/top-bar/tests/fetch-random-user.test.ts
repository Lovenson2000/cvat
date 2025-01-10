import fetchRandomUser from 'actions/fetch-random-user';

global.fetch = jest.fn();

describe('fetchRandomUser', () => {
    it('should fetch and return the first user', async () => {
        const mockUser = {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
            address: {
                street: 'Kulas Light',
                suite: 'Apt. 556',
                city: 'Gwenborough',
                zipcode: '92998-3874',
                geo: {
                    lat: '-37.3159',
                    lng: '81.1496',
                },
            },
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce([mockUser]),
        });

        const user = await fetchRandomUser();

        expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
        expect(user).toEqual(mockUser);
    });

    it('should throw an error if the fetch fails', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        await expect(fetchRandomUser()).rejects.toThrow('Network error');
        expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });
});
