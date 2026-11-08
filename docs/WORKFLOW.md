# The dsh-video workflow

How the Video Studio maps onto the multi-model AI video pipeline
(source: the "Claude Code/Codex + Seedance" production workflow).

## Roles

| Role | Owner | Responsibility |
| --- | --- | --- |
| You | human | Pick the direction, confirm the art style, approve spending; review motion and sound. |
| Director | coding agent (Claude Code / Codex / a Harness session) | Write the story and storyboard, write every prompt, invoke the other models, inspect frames and videos, do post-production with ffmpeg/Python. |
| Painter | image model (e.g. Codex-driven image generation) | Concept art, look-development frames, and first/last frames per shot. |
| Animator | video model (e.g. Seedance) | Turn first/last frames into seconds of video. Paid by the second — regenerate as little as possible. |

## The cost rule

A prompt edit is free. Repainting a frame is cheap. Regenerating video is paid per second.
Therefore: find errors in **text** before they reach a **frame**; find errors in a **frame** before they reach **video**.

## Where dsh-video fits

1. **Plan** — create a project; set 画幅/aspect ratio, target length, budget.
2. **Storyboard** — one row per shot: scene, camera/motion, frame prompt, video prompt.
3. **Direct** — paste the copied director brief into a fresh Harness session; the agent drives painter and animator models from your prompts.
4. **Advance** — per shot, cycle the status badge as work completes; the header shows `done/total`.
5. **Hand off** — export the storyboard as Markdown when the film is cut.

## Tips

- Keep shot prompts self-contained: subject, environment, lighting, camera move, duration.
- Freeze the look with concept art before batching first/last frames.
- Batch video generations only after every frame in the row is approved.
