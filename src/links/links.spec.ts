import * as request from "supertest";

const host = 'http://localhost:3000'

describe("LinksAPI", ()=>{
  it('GET /links (should return list of links)', () => {
    return request(host)
      .get('/links')
      .expect(200)
      .expect((response) => {
        const links = response.body;
        expect(links).toBeDefined();
        expect(Array.isArray(links)).toBeTruthy();
        expect(links.length).toBeGreaterThanOrEqual(1); // Assuming there's at least one link

        // Check if each link has required properties
        links.forEach((link) => {
          expect(link.originalURL).toBeDefined();
          expect(link.shortURL).toBeDefined();
          expect(link.path).toBeDefined();
          expect(link.userId).toBeDefined();
          expect(link.createdAt).toBeDefined();
        });
      });
  });

  it('GET /links/:id (should return link details)', async () => {
    // Replace 'asdw' with the actual id you want to test
    const linkId = 'asdw';
    const response = await request(host)
      .get(`/links/${linkId}`)
      .expect(200);

    const link = response.body;
    expect(link).toBeDefined();
    expect(link.originalURL).toBe('https://nafhan.site3');
    expect(link.shortURL).toBe('https://nafhan.site/test3');
    expect(link.path).toBe('test3');
    expect(link.userId).toBe('sdndcdns-1213ndw-sddncadfc');
    expect(link.createdAt).toBeDefined();
    expect(link.id).toBe(linkId);
  });

  it('/POST links', () => {
    return request(host)
      .post('/links')
      .send({
        originalURL: 'http://example.com',
        shortURL: 'http://short.com',
        path: '/example',
        userId: 'user123',
      })
      .expect(201) // Menentukan status code yang diharapkan (201 untuk created)
      .expect('Content-Type', /json/)
      .then(response => {
        // Verifikasi isi respons sesuai kebutuhan
        expect(response.body.originalURL).toEqual('http://example.com');
        expect(response.body.shortURL).toEqual('http://short.com');
        expect(response.body.path).toEqual('/example');
        expect(response.body.userId).toEqual('user123');
      });
  });
})