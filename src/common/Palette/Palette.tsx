import { useState } from 'react';
import { connect } from 'react-redux'
import { v4 } from 'uuid';
import styles from './Palette.module.css';

type PaletteElement = {
    paletteElementId: string,
    color: string,
    className: string;
    onClick: (colorValue: string) => void;
}

interface PaletteProps {
    sendValue: (colorValue: string) => void
}   

const Palette = ({
    sendValue,
}: PaletteProps) => {
    const paletteElements: Array<PaletteElement> = [];
    const colors = ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF', '#980000', '#FF0000', '#FF9900', "#FFFF00", "#00FF00", "#00FFFF", "#4A86E8", "#2824EE", "#9900FF", "#FF00FF", "#E6B8AF", "#F4CCCC", "#FCE5CD", "#FFF2CC", "#D9EAD3", "#D0E0E3", "#CFE2F3", "#CFE2F3", "#D9D2E9", "#EAD1DC", "#DD7E6B", "#EA9999", "#F9CB9C", "#FFE599", "#B6D7A8", "#A2C4C9", "#A4C2F4", "#9FC5E8", "#9FC5E8", "#D5A6BD", "#CC4125", "#E06666", "#F6B26B", "#FFD966", "#93C47D", "#76A5AF", "#6D9EEB", "#6FA8DC", "#8E7CC3", "#C27BA0", "#A61C00", "#CC0000", "#E69138", "#F1C232", "#6AA84F", "#45818E", "#3C78D8", "#3D85C6", "#674EA7", "#A64D79", "#85200C", "#990000", "#B45F06", "#BF9000", "#38761D", "#134F5C", "#1155CC", "#0B5394", "#351C75", "#741B47", "#5B0F00", "#660000", "#783F04", "#7F6000", "#274E13", "#0C343D", "#1C4587", "#073763", "#20124D", "#4C1130"];
    const [selectedColor, setSelectedColor] = useState('')
    for (let i = 0; i < 80; i++) {   
        paletteElements.push({
            paletteElementId: v4(),
            color: colors[i],
            className: `${styles.palette_element} ${colors[i] === selectedColor ? styles.palette_element_selected : ''}`,
            onClick: (color) => {
                setSelectedColor(color);
                sendValue(color)
            }
        });
    }
    const listElements = paletteElements.map((paletteElement) => 
        <li 
            key = {paletteElement.paletteElementId}
            style = {{"background": paletteElement.color,
                      "border": "0.5px solid rgba(0, 0, 0, 0.5)"
            }}
            className = {paletteElement.className}
            onClick = {() => paletteElement.onClick(paletteElement.color)} 
        >
        </li>
    )
    return (
        <ul 
            className = {styles.palette}
        >
            {listElements}
        </ul>
    )
}

export default connect()(Palette)