import { parseEmails } from "helpers/Util";

test("parseEmails returns json list of emails", () => {
    const s_emails = `example@email.com
            test@email.com
        brian@email.com`;
    const emails = ["example@email.com", "test@email.com", "brian@email.com"];
    expect(parseEmails(s_emails)).toBe(JSON.stringify(emails));
})

test ("parseEmails handles one email, no newlines", () => {
    const s_emails = `example@email.com`;
    const emails = ["example@email.com"];
    expect(parseEmails(s_emails)).toBe(JSON.stringify(emails));
})

test ("parseEmails handles no emails", () => {
    const s_emails = "";
    const emails = [];
    expect(parseEmails(s_emails)).toBe(JSON.stringify(emails));
})