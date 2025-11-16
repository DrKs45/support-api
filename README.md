ALLAIN Amaury - B3 SRC

# Évaluation Git – Rendu écrit

capture des règle appliquer sur main : 

<img width="1011" height="720" alt="RulesMain1" src="https://github.com/user-attachments/assets/8e39f14c-7d01-4714-a06d-262da5871ba2" />
<img width="1011" height="878" alt="RulesMain2" src="https://github.com/user-attachments/assets/99491328-786d-4b89-b779-01cf66fdce96" />
<img width="985" height="895" alt="RulesMain3" src="https://github.com/user-attachments/assets/2b9e6ef5-f408-4a3e-9bdb-f28acb3c03cb" />

## Pourquoi ces règles sont importantes


- **Pull request obligatoire** → Pas de merge sans revue, même en solo.  
- **Approbations (même 0)** → Sert de rappel pour relire son code avant de merger.  
- **Approbations obsolètes rejetées** → Les nouveaux commits annulent automatiquement les validations précédentes.  
- **Status checks obligatoires** → Les tests doivent passer avant le merge.  
- **Branche à jour** → Évite les conflits et maintient un code cohérent.

**Résultat :** moins de bugs, plus de qualité et un workflow professionnel.

---

## Pourquoi ces checks ?

- **code-quality** : Code propre, uniforme, lisible et sans erreurs de style.  
- **tests** : Fonctionnalités validées, pas de régressions.

---

## Configuration : Prettier, ESLint, Jest et Supertest

```bash
npm init -y
npm install --save-dev eslint
npx eslint --init
npm install --save-dev prettier
npm install --save-dev jest
npm install --save-dev supertest
```

---

## Initial Setup (création de `main` et configuration des règles)

```bash
git checkout -b feature/initial-setup
git add .
git commit -m "chore: initial project setup with lint, prettier, tests and CI"
git branch -M main
git push origin main
```

---

## PR 1 — Initial Setup (CI simple + tests minimaux)

```bash
git checkout -b feature/project-setup
git add package.json .eslintrc.json .prettierrc src/server.js .github/workflows/ci.yml
git commit -m "chore: initial project setup with lint, prettier and CI"
git push origin feature/project-setup
```

---

## PR n°2 — API + MongoDB

```bash
git checkout -b feature/mongodb-api

git add src/config/database.js src/server.js
git commit -m "feat: add database config and update server config"

git add src/models/RequestType.js src/routes/requestTypes.js
git commit -m "feat: add request type for routes and model"

git add scripts/seed.js tests/requestTypes.test.js
git commit -m "add seed script and test request type"

git push origin feature/mongodb-api
```

---

## PR n°3 — Mise à jour CI + Documentation

```bash
git checkout -b feature/update-ci-and-docs

git add tests/requestTypes.test.js
git commit -m "test: add API test"

git add .github/workflows/ci.yml
git commit -m "ci: add full GitHub Actions workflow with MongoDB"

git add .github/pull_request_template.md README.md
git commit -m "docs: add readme update and pull request template"

git push origin feature/tests-and-docs
```
