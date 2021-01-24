import {
    AnimationTriggerMetadata,
    animate,
    state,
    style,
    transition,
    trigger
} from "@angular/animations";
import { firstCardIndex, scaleRatio, yOffsetPerLevel } from "./app.component";

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

export function cardStack(cardCount: number): AnimationTriggerMetadata {
    const states = Array(cardCount).map((_, index) => state(`${index}`, style(calculateStyles(index, cardCount))));
    return trigger("cardStack", [
        ...states,
        state("void", style({ ...calculateStyles(cardCount, cardCount), opacity: 0 })),
        transition(":leave", [
            style({ opacity: 1 }),
            animate("500ms linear", style({ opacity: 0, transform: "scale(0.5) translateY(10rem)" })),
        ]),
        transition("* <=> *", animate("500ms cubic-bezier(0.68, -0.55, 0.27, 1.55)"))
    ]);
}
