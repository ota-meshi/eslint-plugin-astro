import cp from "child_process"
import assert from "assert"
import fs from "fs"
import path from "path"

const TEST_FIXTURES_ROOT = path.join(__dirname, "../fixtures/integration")

for (const dirent of fs.readdirSync(TEST_FIXTURES_ROOT, {
  withFileTypes: true,
})) {
  if (!dirent.isDirectory()) continue
  const TEST_CWD = path.join(TEST_FIXTURES_ROOT, dirent.name)

  describe(`Integration for ${dirent.name}`, () => {
    let originalCwd: string

    before(() => {
      originalCwd = process.cwd()
      process.chdir(TEST_CWD)
      cp.execSync("npm i -f", { stdio: "inherit" })
    })
    after(() => {
      process.chdir(originalCwd)
    })

    it("should lint errors", () => {
      const envFile = path.join(TEST_CWD, "test-env.json")
      const expectedFile = path.join(TEST_CWD, "expected.json")
      const actualFile = path.join(TEST_CWD, "actual.json")
      const env = {
        // eslint-disable-next-line no-process-env -- test
        ...process.env,
        ...(fs.existsSync(envFile)
          ? // eslint-disable-next-line @typescript-eslint/no-require-imports -- test
            require(envFile)
          : {}),
      }
      try {
        const res = cp.execSync(`npx eslint src --format json`, {
          env,
          cwd: TEST_CWD,
        })
        fs.writeFileSync(actualFile, `no error:${res}`)
        assert.fail("Expect error")
      } catch (e: any) {
        const output = `${e.stdout}`
        try {
          fs.writeFileSync(actualFile, output)
          const results = JSON.parse(output)
          fs.writeFileSync(actualFile, JSON.stringify(output, null, 2))
          assert.ok(Array.isArray(results), "output is not array")
          const result = results.map((r) => ({
            ...r,
            filePath: path.relative(TEST_CWD, r.filePath),
          }))
          fs.writeFileSync(actualFile, JSON.stringify(result, null, 2))

          const expected =
            // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires -- test
            require(expectedFile)
          assert.deepStrictEqual(result, expected)
        } catch (e) {
          console.error(e)
          throw e
        }
      }
    })
  })
}
