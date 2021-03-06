import React from 'react';
import { acceptFollow, acceptUnfollow, setCurrentPage, setToggleIsFollowingProgress, requestUsers, follow, unfollow } from '../../redux/users-reducer';
import {connect} from 'react-redux';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import {withAuthRedirect} from './../../hoc/withAuthRedirect'
import { compose } from 'redux';
import { getUsers, getUsersSuperSelector, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount } from '../../redux/users-selectors';


class UsersContainer extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const {requestPage, pageSize} = this.props
        this.props.requestUsers(requestPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize);
    }

    render() {

        return  <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users 
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    followingInProgress={this.props.followingInProgress}
            /> 
            </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        // users: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

let mapDispatchToProps = {
    acceptFollow,
    acceptUnfollow,
    setCurrentPage,
    setToggleIsFollowingProgress,
    requestUsers,
    follow,
    unfollow
}

const SuperUsersContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersContainer)

export default SuperUsersContainer;