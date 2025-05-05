Plan to Align `src/components/GitHubHeatmap.tsx` With `og/components/github-heatmap.tsx`:

1. **Compare Component Markup:**
   - Thoroughly examine both the `src` and `og` versions of `GitHubHeatmap.tsx` to identify exact differences in structure, classnames, and applied Tailwind utility classes.

2. **Update Grid Container Height:**
   - Change the grid container's height in `src/components/GitHubHeatmap.tsx` from `h-[92px]` to `h-[120px]` to match the `og` layout.

3. **Correct Cell Sizing:**
   - Adjust cell classnames in the day squares; change from `h-3.5 w-3.5 sm:h-4 sm:w-4` to `w-3 h-3` as in the `og` component.
   - Verify and update any mobile or responsive sizing as in the `og` code.

4. **Fix Grid Gap:**
   - Ensure the gap between cells uses `gap-1` instead of `gap-px` in the grid container.

5. **Verify/Implement grid-cols-53:**
   - Inspect `src/app/globals.css` for a `.grid-cols-53` class.
   - If missing, add a custom Tailwind utility for `grid-cols-53` (matching the `og` project's implementation), or confirm Tailwind is generating a 53-column grid when required by the component.

6. **Refine Weekday (Y-Axis) Label Styling:**
   - Match margin, padding, font sizes, and spacing of weekday labels to the `og` version.
   - Adjust Tailwind/utility classes or related CSS to align positioning and visual prominence.

7. **Review and (if needed) Update Tooltip Experience:**
   - Compare the tooltip implementation between the two projects.
   - If the `og` version uses Shadcn UI, refactor the tooltip in `src` to use the same variant and styles for consistency, especially if it affects spacing/layout.

8. **Harmonize General Styling:**
   - Review all paddings, margins, and font sizes used within, around, and between elements in the heatmap—replicating `og`’s choices.
   - Double-check scroll behavior to ensure vertical scrollbars are eliminated by the above changes.

9. **Test and Validate:**
   - Render the updated `src/components/GitHubHeatmap.tsx` and compare side-by-side with the `og` component to guarantee pixel-perfect alignment in all supported browsers and screen sizes.
   - Adjust any remaining minor discrepancies.
