# Commit Rule

> Purpose: define a simple, traceable commit-message format for the IBNote repo.
> Scope: applies to all human and agent commits in this repository.

## 1. Core rule

Every commit message must include the current `package.json` version string in the **first line title** so it is easy to trace which repo version the commit happened under.

Current example version format:
- `0.1.0`

---

## 2. Required commit message format

Use this exact shape:

```text
ibnote {version} <short title>

- change item 1
- change item 2
- change item 3
```

Rules:
- first line must be a **single-line title**
- second line must be **blank**
- body must be a **bullet list**
- include the exact version string from `package.json` in the title line
- the title should be short and summary-like
- the bullets should list the key changes truthfully

---

## 3. Title examples

Good:
- `ibnote 0.1.0 initialize repo and docs governance`
- `ibnote 0.1.0 add template library route`
- `ibnote 0.1.0 document feature advancement protocol`

Avoid:
- `init`
- `update stuff`
- `fix`
- messages without version string
- multiline titles

---

## 4. Body examples

Good:
```text
ibnote 0.1.0 initialize repo and docs governance

- initialize git tracking for the project
- add commit message convention with package version in the title
- capture current bootstrap work and operating docs in the first commit
```

Good:
```text
ibnote 0.1.0 add records list route

- implement /my/records route shell and filtering UI
- add local verification for empty and loaded states
- update bootstrap tracker and night run report
```

---

## 5. Operational notes

- Read `package.json` before committing and use its current `version` field in the title line.
- If the version changes later, future commits must use the new version string.
- Keep commit messages truthful and specific enough that the history can be skimmed quickly.
- When a change also updates docs or trackers, mention that in the bullet list.
