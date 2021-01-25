import {
    animate,
    state,
    style,
    transition,
    trigger
} from "@angular/animations";

export const firstCardIndex = 0;
export const scaleRatio = 10;
export const yOffsetPerLevel = 3;
export const cardCount = 5;

export function calculateStyles(index: number, totalCount: number): { "z-index": number; "transform"?: string; "filter"?: string; } {
    if (index === firstCardIndex)
        return { "z-index": totalCount - index };
    const scaleClause = `scale(${(scaleRatio - index) / scaleRatio})`;
    const translateClause = `translateY(${-index * yOffsetPerLevel}rem)`;

    return {
        "z-index": totalCount - index,
        transform: `${scaleClause} ${translateClause}`,
        filter: `brightness(${(totalCount - index) / totalCount})`,
    };
}

// eslint-disable no-magic-numbers
export const cardStack = trigger("cardStack", [
    state("0", style(calculateStyles(0, cardCount))),
    state("1", style(calculateStyles(1, cardCount))),
    state("2", style(calculateStyles(2, cardCount))),
    state("3", style(calculateStyles(3, cardCount))),
    state("4", style(calculateStyles(4, cardCount))),
    state("void", style({ ...calculateStyles(5, 5), opacity: 0 })),
    transition(":leave", [
        style({ opacity: 1 }),
        animate("500ms linear", style({ opacity: 0, transform: "scale(0.5) translateY(10rem)" })),
    ]),
    transition("* <=> *", animate("500ms cubic-bezier(0.68, -0.55, 0.27, 1.55)"))
]);
// eslint-enable no-magic-numbers
