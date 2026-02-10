import AbstractSeeder from "./AbstractSeeder";

class NoteSeeder extends AbstractSeeder {
    constructor() {
        super({ table: "notes", truncate: true });
    }

    run() {
        for (let i = 0; i < 10; i += 1) {
            const fakeNote = {
                name: this.faker.lorem.words(3).slice(0, 25),
                content_id: this.faker.string.alphanumeric(10),
                slug: this.faker.string.alphanumeric(10),
                is_private: this.faker.datatype.boolean(),
                linkshare: this.faker.datatype.boolean(),
                password: this.faker.internet.password(),
                refName: `note_${i}`,
            };

            this.insert(fakeNote);
        }
    }
}

export default NoteSeeder;
