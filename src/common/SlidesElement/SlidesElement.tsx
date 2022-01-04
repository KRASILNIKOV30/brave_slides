import { useRef, useCallback } from 'react';
import styles from './SlidesElement.module.css'
import Figure from "./Figure/Figure"
import Text from "./Text/Text"
import type { Editor, SlideElement } from "../../model/types"
import { useDragAndDrop } from '../../core/hooks/useDragAndDrop';
import type { Position, Size } from '../../core/types/types'
import type { AppDispatch } from '../../model/store';
import { changePosition, changeSize, changeTextProps, selectElement, selectManyElements } from '../../model/actionCreators';
import { connect } from 'react-redux';
import { useResize } from '../../core/hooks/useResize';

type SlidesElementProps = {
    slideElement: SlideElement | undefined,
    active: boolean,
    changePosition: (newX: number, newY: number) => void,
    selectElement: (elementId: string) => void,
    selectManyElements: (elementId: string) => void,
    changeTextValue: (value: string) => void,
    changeSize: (widthShift: number, heightShift: number) => void
}

const SlidesElement = ({
    slideElement,
    active,
    changePosition,
    selectElement,
    selectManyElements,
    changeTextValue,
    changeSize
}: SlidesElementProps) => {
    const slideElementRef = useRef<HTMLDivElement>(null);

    const isOnShift = useRef<boolean>(false)

    /* const clickOutsideFunction = () => {
        window.onmousedown = (e) => {
            isOnShift.current = e.shiftKey;
        }
        if (active && !isOnShift.current) {
            dispatch(removeSelection, { elementId: slideElement.elementId })
        } else {
            return(null)
        }
    }
    useClickOutside(slideElementRef, clickOutsideFunction); */ 
    
    useDragAndDrop({
        elementRef: slideElementRef, 
        onMouseUpFunction: (Coordinates: Position) => changePosition(Coordinates.x, Coordinates.y)
    })

   

    let edgeRef = useRef<HTMLDivElement>(null);

    type CornersType = {
        topLeft: React.RefObject<HTMLDivElement>,
        topRight: React.RefObject<HTMLDivElement>,
        bottomLeft: React.RefObject<HTMLDivElement>,
        bottomRight: React.RefObject<HTMLDivElement>
    }

    const topLeftRef = useRef<HTMLDivElement>(null);
    const topRightRef = useRef<HTMLDivElement>(null);
    const bottomLeftRef = useRef<HTMLDivElement>(null);
    const bottomRightRef = useRef<HTMLDivElement>(null);

    const corners: CornersType = {
        topLeft: topLeftRef,
        topRight: topRightRef,
        bottomLeft: bottomLeftRef,
        bottomRight: bottomRightRef
    }

    useResize({
        elementRef: slideElementRef,
        edgeRef,
        corners,
        onMouseUpFunctions: [
            (size: Size) => changeSize(size.width, size.height),
            (coordinates: Position) => changePosition(coordinates.x, coordinates.y)
        ]
    }) 

    if(slideElement === undefined) {
        return (<div></div>)
    }
    
    switch (slideElement.elementType) {
        case "text": 
            return (
                <div
                    ref = {slideElementRef}
                    className = {`${active ? styles.element_active : styles.element}`}
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x,
                        'width': slideElement.size.width,
                        'height': slideElement.size.height
                    }}
                    onMouseDown = {(e) => {
                        console.log('onMouseDown')
                        if (!active) {
                            if (e.ctrlKey || e.shiftKey) {
                                selectManyElements(slideElement.elementId)
                            }
                            else {
                                selectElement(slideElement.elementId)
                            }
                        }
                    }}
                >
                    {
                        active &&
                        <div className = {styles.points_container}>
                            <div className={`${styles.point} ${styles.point_top_left}`} ref = {topLeftRef} id = 'top-left' onMouseDown={(e) => e.stopPropagation}></div>
                            <div className={`${styles.point} ${styles.point_top_right}`} ref = {topRightRef} id = 'top-right' onMouseDown={(e) => e.stopPropagation}></div>
                            <div className={`${styles.point} ${styles.point_bottom_left}`} ref = {bottomLeftRef} id = 'bottom-left' onMouseDown={(e) => e.stopPropagation}></div>
                            <div className={`${styles.point} ${styles.point_bottom_right}`} ref = {bottomRightRef} id = 'bottom-right' onMouseDown={(e) => e.stopPropagation}></div>
                        </div>
                    }
                    <Text
                        size = {{
                            width: slideElementRef.current ? Number(slideElementRef.current?.style.width.substring(0, slideElementRef.current?.style.width.length - 2)) : slideElement.size.width,
                            height: slideElementRef.current ? Number(slideElementRef.current?.style.height.substring(0, slideElementRef.current?.style.height.length - 2)) : slideElement.size.height
                        }}
                        text = {slideElement.textProps!}
                        onKeyUp = {(value) => {
                            if (value !== '') {
                                changeTextValue(value)
                            }
                        }}
                    />
                </div>
            )
        case "figure":
            return (
                <div
                    ref = {slideElementRef}
                    id = {slideElement.elementId}
                    className = {`${active ? styles.element_active : styles.element}`}
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x,
                        'width': slideElement.size.width,
                        'height': slideElement.size.height
                    }}
                    onMouseDown = {(e) => {
                        if (!active) {
                            if (e.ctrlKey || e.shiftKey) {
                                selectManyElements(slideElement.elementId)
                            }
                            else {
                                selectElement(slideElement.elementId)
                            }
                        }
                    }}
                >
                    {
                        active &&
                        <div className = {styles.points_container}>
                            <div className={`${styles.point} ${styles.point_top_left}`} ref = {topLeftRef} id = 'top-left'></div>
                            <div className={`${styles.point} ${styles.point_top_right}`} ref = {topRightRef} id = 'top-right'></div>
                            <div className={`${styles.point} ${styles.point_bottom_left}`} ref = {bottomLeftRef} id = 'bottom-left'></div>
                            <div className={`${styles.point} ${styles.point_bottom_right}`} ref = {bottomRightRef} id = 'bottom-right'></div>
                        </div>
                    }
                    <Figure
                        figure = {slideElement.figure!}
                        size = {{
                            width: slideElementRef.current ? Number(slideElementRef.current?.style.width.substring(0, slideElementRef.current?.style.width.length - 2)) : slideElement.size.width,
                            height: slideElementRef.current ? Number(slideElementRef.current?.style.height.substring(0, slideElementRef.current?.style.height.length - 2)) : slideElement.size.height
                        }}
                    />
                </div>
            )    
        case "image":
            return (
                <div
                    ref = {slideElementRef}
                    className = {`${active ? styles.element_active : styles.element}`}
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x,
                        'width': slideElement.size.width,
                        'height': slideElement.size.height
                    }}
                    onMouseDown = {(e) => {
                        if (!active) {
                            if (e.ctrlKey || e.shiftKey) {
                                selectManyElements(slideElement.elementId)
                            }
                            else {
                                selectElement(slideElement.elementId)
                            }
                        }
                    }}
                >
                    {
                        active &&
                        <div className = {styles.points_container}>
                            <div className={`${styles.point} ${styles.point_top_left}`} ref = {topLeftRef} id = 'top-left'></div>
                            <div className={`${styles.point} ${styles.point_top_right}`} ref = {topRightRef} id = 'top-right'></div>
                            <div className={`${styles.point} ${styles.point_bottom_left}`} ref = {bottomLeftRef} id = 'bottom-left'></div>
                            <div className={`${styles.point} ${styles.point_bottom_right}`} ref = {bottomRightRef} id = 'bottom-right'></div>
                        </div>
                    }
                    <img
                        className = {styles.image_element}
                        src = {slideElement.image}
                        style={{
                            width: slideElementRef.current ? Number(slideElementRef.current?.style.width.substring(0, slideElementRef.current?.style.width.length - 2)) : slideElement.size.width,
                            height: slideElementRef.current ? Number(slideElementRef.current?.style.height.substring(0, slideElementRef.current?.style.height.length - 2)) : slideElement.size.height
                        }}
                    />
                </div>
            )
    }
    
}

function mapStateToProps(state: Editor, ownProps: {slideId: string, elementId: string, active: boolean}) {
    const indexSlide: number = state.presentation.slides.findIndex(slide => slide.slideId === ownProps.slideId);
    return {
        slideElement: state.presentation.slides[indexSlide].elements.find(slidesElement => slidesElement.elementId === ownProps.elementId),
        active: ownProps.active
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        changePosition: (newX: number, newY: number) => dispatch(changePosition(newX, newY)),
        selectElement: (elementId: string) => dispatch(selectElement(elementId)),
        selectManyElements: (elementId: string) => dispatch(selectManyElements(elementId)),
        changeTextValue: (value: string) => dispatch(changeTextProps(undefined, undefined, undefined, value)),
        changeSize: (widthShift: number, heightShift: number) => dispatch(changeSize(widthShift, heightShift))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlidesElement)