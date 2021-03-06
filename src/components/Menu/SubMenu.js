import React, { Component, PropTypes } from 'react';

import MixinComponent from './MixinComponent';

import GridList from '../Grid/GridList';

import Label from '../Label';

import Popover from '../Popover';

import Left from '../Left';

import VerticalMiddle from '../VerticalMiddle';

import SvgIcon from '../SvgIcon';

import { gKeyboardArrowRight,  gKeyboardArrowDown } from '../../svgIcons/google/Hardware';

import cloneElements from './cloneElements';

class SubMenu extends MixinComponent {
	constructor(props) {
        super(props);
        this.state = {
        	hover: false,
        	open: props.open
        };

        this.type = 'SubMenu';
    }

	static propTypes = {
		label: PropTypes.string,
		open: PropTypes.bool,
		icon: PropTypes.node,
		children: PropTypes.node,
		bgColor: PropTypes.string,
		onClick: PropTypes.func
	};

	static defaultProps = {
		label: 'SubMenu',
		open: false,
	};

	render() {
		const { label, children, onClick, icon } = this.props;
		const menuProps = this.getMenuProps();
		const rootMenu = menuProps.component;

		const height = menuProps.itemHeight;
		const activeBgColor = menuProps.itemActiveBgColor;
		const textColor = menuProps.itemColor;
		const fontFamily = menuProps.itemFontFamily;
		const fontSize = menuProps.itemFontSize;
		const padding = menuProps.itemPadding;

		const bgColor = menuProps.subBgColor;

		const rootMode = menuProps.mode;

		const index = menuProps.index;

		const PCPopoverStyle = {
			backgroundColor: bgColor,
			border: 'none',
			left: 0,
			top: 0,
			width: 'parent',
			minWidth: 150,
			borderRadius: 0,
			padding: 0,
			boxShadow: 'none',
			display: 'inline-block'
		};

		const iconSize = fontSize + 4, arrowSize = 20;
		const arrowStyle = {
			margin: '0 0 0 10',
		};

		const iconStyle = {
			margin: (height - iconSize) / 2,
			marginRight: 5,
			marginLeft: 0
		};


		let _children = cloneElements(children);

		const iconElement = icon !== undefined ? <VerticalMiddle height={height}>{React.cloneElement(icon, {color: textColor, width: iconSize, height: iconSize, style: iconStyle})}</VerticalMiddle> : '';

		const labelElement = <Label content={label} fontFamily={fontFamily} fontSize={fontSize} color={textColor} height={height}/>;
		const arrowElement = <VerticalMiddle height={height}><SvgIcon color={textColor} width={arrowSize} height={arrowSize} style={arrowStyle}>
				<path d={this.state.open ? gKeyboardArrowDown : gKeyboardArrowRight}/>
			</SvgIcon></VerticalMiddle>;
		const childRootElement = rootMode === 'vertical' || index > 1 ? <div style={{
			display: this.state.open ? 'block' : 'none',
			margin: `0px ${-padding * index}px`,
			// padding: `0px ${padding}px`,
			backgroundColor: bgColor
		}}>{_children}</div>:
			<Popover open={this.state.open} isUseSlideAnimation={true} maxHeight={250} outClickClose={false} style={PCPopoverStyle} onRequestClose={e => this.setState({activeIndex: -1, open: false})}>
				<div style={{margin: `0px ${-padding}px`, backgroundColor: bgColor}}>{_children}</div>
			</Popover>;
		return <div style={{
				// boxSizing: 'border-box',
				padding: `0px ${padding * index}px`
			}} onMouseOver={e => {
				this.setState({hover: true});
				if(rootMode !== 'vertical') {
					this.setState({open: true})
				};
			}} onMouseOut={e => {
				this.setState({hover: false});
				if(rootMode !== 'vertical') {
					this.setState({open: false});
				}
			}}>
			<div onClick={e => {
				this.setState({open: !this.state.open});
				if(onClick) {
					onClick();
				}
			}}><Left>
				{iconElement}
				{labelElement}
				{arrowElement}
			</Left></div>
			{childRootElement}
		</div>;
	}

}

export default SubMenu;