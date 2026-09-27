# 1st prompt
```bash
We are writing AgentClinic, a place for AI agents to get relief from their humans. Look in the @README.md for input from stakeholders.
Let's create a "constitution" in a specs directory:
- `mission.md`
- `tech-stack.md`
- `roadmap.md` for high-level implementation oder, in very small phases of work.

Important: You *must* use your AskUserQuestion tool, grouped on these 3, before writing to disk 
```

# 2nd prompt
```bash
Add a target audience to the mission
- Course students learning spec-driven development with AI coding agents
- Developers giving AI coding demos at confrence booth
```

# 3rd prompt
```bash
Find the next phase on specs/roadmap.md and mak a branch, ask me about the feature spec.
Create:
- A new directory YYYY-MM-DD-feature-name under specs for this feature work
- In there:
    - `plan.md` as a series of numbered task groups
    - `requirements.md` for the scope, decisions, context
    - `Validation.md` for how to know the implemenation succeeded and can be merged

Refer to specs/mission.md and specs/tech-stack.md for guidance

Important: You *must* use your AskUserQuestion tool, grouped on these 3, before writing to disk
```

# 4th prompt
```bash
Implement the remaining task groups
```

# 5th prompt
```bash
Update specs/xxxxx/plan.md and implemantation of main layout component with a header/main/footer as three subcomponents. Make a CSS file, import it, and link to it.
```
# My prompt - 5th prompt + 0.1
```bash
Add script to run frontend and backend from the root, use Turborepo for local dev setup and docker, docker compose for deployment on cloud. Update @specs/tech-stack.md , @specs/mission.md , @specs/roadmap.md  then add tasks in 2026-09-25-phase-1-foundation after that start implementing the same
```

# 6th prompt
```bash
Update the spec to capture that header, footer, and main components should be in their own files.
```

# 7th prompt
```bash
Mark this specs/roadmap.md phase as complete, commit this work, switch to main, and merge this branch then delet it.
```

# 8th prompt
```bash
The product's web UI should follow responsive design. Upddate teh product specs and all feature specs to reflect this, as well as any code.
```

# 9th prompt
```bash
I want to keep a CHANGELOG.md in the project root, with headings for dates. If no changelog, examine git commits and add bullets for each date then, as we work, we will manually invoke this skill before merging. help me write a skill for this.
```

# 10th prompt
```bash
Update this tech-stack.md to capture that we want to use Vitest tests for validation and write a script in package.json.
```

# 11th prompt
```bash
Update existing specs and code to reflect these changes
```

# 12th prompt
```bash
Write a new test suite using the specified testing fremework
```

# 13th prompt
```bash
Commit this, switch to main, and merge this branch, then delete it.
```


# 14th prompt
Clean context window and use the following prompt.
```bash
Find the new phase on specs/roadmap.md and make a branch, ask me about the feature spec.
Create:
- A new directory YYYY-MM-DD-feature-name under sp3ecs for this feature work
- In there:
    - `plan.md` as a series of numbered task groups.
    - `requirements.md` for the scope, decisions, context
    - `validation.md` for how to know the implemenation succeeded and can be merged

Refer to secs/mission.md and specs/tech-stack.md for guidance.

Important: You *must* use your AskUserQuestion tool, grouped on these 3, before writing to disk.
```

# 15th prompt
```bash
Use extracted props definitions with a TypeScript type instead of inline and re-run tests.
```

# 16th prompt
```bash
Do a deep review: Spown multiple subagent to go through all the changes on this branch from three different prespectives and see if anything doesn't make sense. Could be better, etc.
```

# 17th Prompt
```bash
Go through all the features on specs/roadmap.md, make a mvp branch, and ask me about the feature specs needed to complete an MVP.
Create:
    - A new directory under specs for this features work
    - In there:
        - `Plan.md` for the task list
        - `requirements.md` for the scope, decistions, context
        - `validation.md` for how to know the implementation succeeded and can be merged

Refer to specs/mission.md and specs/tech-stack.md plush the existing feature specs for guidance.

Important: You *must* use your AskUserQuestion tool, grouped on these 3, before writing to disk.
```

# 18th Prompt
- share stakeholders findings based on the following prompt and actionise items.
```base
Based on the MVP, did you find anything that needs Clarification in the specs?
```

# ------- Lagacy project

# 1st prompt
```bash
We have an AgentClinic project, a place for AI agents to get relief from their humans.

Look in README.md for input from sakeholders. make a consitution in a specs directory:
- `mission.md`
- `tech-stack.md`
- `roadmap.md` should be basesd on the TODO.md from high-level implemenation order, in very samll phases of work.

Interview me about mission, target audience, tech stack gaps.

Important: You *must* use your AskUserQuestion tool, grouped on these 3, before writing to disk.
```

# 2nd prompt (skill repeating prompts)
```bash
I want to stop repeating the feature spec prompt. Use your skill creator to help me write a feature spec local project skill. Here is the previous prompt

Find the new phase on specs/roadmap.md and make a branch, ask me about the feature spec.
Create:
- A new directory YYYY-MM-DD-feature-name under specs for this feature work
- In there:
    - `plan.md` as a series of numbered task groups.
    - `requirements.md` for the scope, decisions, context
    - `validation.md` for how to know the implemenation succeeded and can be merged

Refer to secs/mission.md and specs/tech-stack.md for guidance.

Important: You *must* use your AskUserQuestion tool, grouped on these 3, before writing to disk.
```

# 3rd prompt
```bash
Weh are my databse choices if we want to deploy with vercel but also have a good local DX?
Important: You *must* use your AskUserQuestion tool to ask me follow-up questions.
```