import { Size, Position } from '../core/types/types'

type Editor = {
    presentation: Presentation;
    history: History;
    statePreview: boolean;
} 

type History = {
    undoStack: Array<Presentation>;
    redoStack: Array<Presentation>
}

type Presentation = {
    title: string;
    slides: Array<Slide>;
    currentSlideIds: Array<string>
}

type Slide = {
    slideId: string;
    elements: Array<SlideElement>;
    background: string;
    selectedElementsIds: Array<string>
}

type SlideElement = {
    elementId: string;
    elementType: "text" | "figure" | "image";
    position: Position; 
    isSelected?: boolean;
    size: Size; 
    image?: string;
    textProps?: TextType;
    figure?: FigureType
}

type TextType = {
    font: string;
    textColor: string;
    bgColor: string | null;
    textValue: string;
    fontSize: number;
    fontWeight: "light" | "regular" | "bold"
}

type FigureType = {
    form: "rectangle" | "circle" | "triangle";
    strokeWidth: number;
    strokeColor: string;
    fillColor: string
}

export type { TextType, SlideElement, Slide, Presentation, History, Editor, FigureType};