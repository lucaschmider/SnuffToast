export const HammerPan = "pan";
export const HammerPanEnd = "panend";
export interface HammerPanEventData extends Event {
    deltaX: number;
    deltaY: number;
}
