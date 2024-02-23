import * as request from 'supertest';

describe('AppController (e2e)', () => {
  // let app: INestApplication;
  //
  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();
  //
  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  it('GET /links (should return list of links)', () => {
    return request('http://localhost:3000')
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
});
