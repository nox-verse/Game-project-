# Image assets · built-in imagegen

## Expanded world and animal friends

All four new images were made with the built-in imagegen tool using the existing project art as the visual reference. Each asset is included locally in dist/assets.

- `forest-wide.webp`: Edit the forest into a zoomed-out playable map. Keep the same pastel cel-shaded storybook style. Make the cottage half its previous size in the distant upper right and the pond much smaller in the lower-right edge. Fill the middle and lower 75% with open sunny yellow-green grass for walking and decorating. Keep rounded trees and small flowers on the outer edges. No characters, text, UI or logos.
- `flower-hill.webp`: Matching storybook clearing with a large open grassy center, pink/cream/yellow wildflowers on the edges, sage hills, rounded trees, blue sky, wooden garden arch in the distant upper right, and a path leading in from the left. No animals or UI.
- `quiet-pond.webp`: Matching storybook clearing with open sunny grass in the center and lower left, a blue pond in the far lower-right quarter, lily pads, rounded stones, a tiny wooden jetty and a bench far back. Keep most ground open for gameplay. No animals or text.
- `animals/{rabbit,bear,deer,raccoon}.png`: A transparent 2x2 character sheet matching the red fox's huge round head, tiny body and bean paws, dark oval eyes with one highlight, pink cheek circles, simple w smile, thick warm brown outline and clean soft cel shading. Ivory rabbit with pink tall ears; caramel bear with round ears and cream muzzle; honey beige deer with small rounded antlers and spots; grey raccoon with eye mask and striped tail. Each full-body character in its own padded quadrant. No background, frame, text or ground shadow. Extracted with sprite-gen slice-sheet, grid 2x2, 400x400, baseline 375, target-height 350, fit contain, chroma-key none, alpha-floor 64.

## Current design · v2

Built-in imagegen was used with the user's attached images as visual references. Generated assets are saved in the project.

### assets/forest-v2.webp

Reference: ffff.png. Actual playable cozy 2D forest game background, landscape 3:2. Follow the art style of the FOREST LOG thumbnails and cover, not the typography or UI. Rounded cartoon trees, pastel sage and yellow green grass, cheerful cream/yellow/pink flowers, distant pale blue mountains and sky. Upper-right fairy-tale timber cottage with a chunky orange terracotta roof and a stepping-stone path. Lower-right blue pond with rounded stones and lily pads. Foreground plants and tree trunk at the edges. Keep the center and lower-left clearing open for gameplay. Simple cute 2D children's storybook game illustration, rounded silhouettes, warm brown soft outlines, clean painted/cel-shaded colors, chunky flowers and tiny stylized leaves, gentle greens, honey cream, pale blue and pink. Luminous spring sunshine. No animals, characters, text, logo, UI or border.

### assets/characters-v2/{red,arctic,tibetan}.png

Reference: wff.png, specifically the three tiny foxes in the top character row. Match rounded simplified baby chibi proportions, soft bold brown outlines, clean flat pastel cel shading and tiny bean paws. Huge heads, tiny potato bodies, no realistic fur strands or adult faces. Three full-body foxes in one horizontal row, in equal-width cells with generous padding and no overlap. Orange red fox with cream muzzle, chest and tail tip, large ears, oval eyes with one white highlight, small w smile and rosy cheeks. Snow-white arctic fox with pale-blue shadows and outline, fluffy cheeks and tiny paws. Beige Tibetan fox with slightly square but friendly cheeks, brown ears and tail. Same scale and style, transparent alpha background, no scenery, labels, frame or ground shadows.

Extraction: sprite-gen slice-sheet --grid 3x1 --names red,arctic,tibetan --chroma-key none --cell-width 400 --cell-height 400 --baseline-y 375 --target-height 350 --fit contain --alpha-floor 64. Report retained in assets/characters-v2/slice-sheet.json.

## Earlier design · v1

## assets/forest.webp

Use case: illustration-story. Asset type: landscape background for playable 2D cozy browser game FOREST LOG. A polished hand-painted children's picture-book forest clearing, wide 3:2 landscape. Soft sage green, warm cream, pale sky blue, warm honey brown, mint, peach. Slightly elevated view, inviting grassy meadow occupying middle and lower 65% as open gameplay space, stepping stone path, small timber cottage with terracotta roof in upper right, tiny blue pond with lily pads at lower right, rounded trees framing left and top, pink and cream flowers, ferns and mushrooms around border, distant mountains and sky. Cozy afternoon sunlight, soft shadows, textured gouache watercolor, rounded friendly shapes. No characters, animals, text, UI or watermarks. Full bleed game background.

## assets/characters/{red,arctic,tibetan}.png

Use case: stylized-concept. Transparent 2D character sprite sheet for FOREST LOG. Exactly three full-body chibi foxes, one horizontal row in equal width cells. Left: happy mischievous red fox, orange fur, cream muzzle, belly and fluffy tail tip. Center: shy arctic fox, snow-white fur with pale sky-blue shadows and big ears. Right: funny calm Tibetan fox, beige fur, brown ears and tail, wide square cheeks and half-lidded eyes. Huge round heads, tiny bodies and paws, glossy brown eyes, pink cheeks, warm brown outlines, soft gouache shading. Consistent scale and style. Transparent alpha background. No labels, props, scenery or shadows outside characters.

Character extraction: sprite-gen slice-sheet, 3x1, names red/arctic/tibetan, chroma-key none, 400x400 output, baseline 375, target-height 350, fit contain, alpha-floor 64. The engine report is retained in assets/characters/slice-sheet.json.
