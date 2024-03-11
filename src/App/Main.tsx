import React from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import Loader from "components/Loader";
import lang from "lang";

import { IUserData, userInit } from "store/reducers/UserSlice";
import { deviceInit, setDeviceSize } from "store/reducers/DeviceSlice";
import { RootState } from "store";

import { deviceLoad } from "api/common/device";

import RouterPage from "./Router";

interface IProps {
    user: IUserData;
    deviceInit: Function;
    setDeviceSize: Function;
    userInit: Function;
    loaderShow: boolean;
    loaderText?: string;
}
interface IState {
    loaded: boolean;
}
class MainIndex extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: false,
        };
    }
    updateDimensions() {
        this.props.setDeviceSize({ width: window.innerWidth, height: window.innerHeight });
    }
    componentDidMount() {
        window.addEventListener("resize", () => this.updateDimensions());
        this.initAll();
        this.updateDimensions();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    initAll() {
        if (!this.state.loaded) {
            this.props.deviceInit(deviceLoad());
            this.props.userInit();
            this.setState({ loaded: true });
        }
    }

    render() {
        const { user, loaderShow, loaderText } = this.props;
        return (
            <>
                <Loader
                    text={!this.state.loaded || user.isLoading ? lang.loaderText : loaderText}
                    fullScreen
                    isLoading={loaderShow || !this.state.loaded || user.isLoading}
                    zIndex={10000}
                />
                {this.state.loaded && !user.isLoading && (
                    <BrowserRouter>
                        <RouterPage />
                    </BrowserRouter>
                )}
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        user: state?.user,
        loaderShow: state?.components?.loader?.show,
        loaderText: state?.components?.loader?.text,
    };
};
const mapDispatchToProps = () => ({
    userInit,
    deviceInit,
    setDeviceSize,
});

export default connect(mapStateToProps, mapDispatchToProps())(MainIndex);
