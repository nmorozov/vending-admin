import React, { Component } from 'react';

import _ from 'lodash';

import BottomScrollListener from 'react-bottom-scroll-listener';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import envelopeTypes from '../../types/envelopeTypes';

import BigTableActionsBar from '../../components/BigTableActionsBar';
import EnvelopesTable from './EnvelopesTable';
import EnvelopesList from './EnvelopesList';
import LoadingSpinner from '../../components/LoadingSpinner';
import AddEditEnvelopePopup from '../Popups/AddEditEnvelopePopup';

import { fetchEnvelopes } from '../../store/actions/EnvelopeActions';
import { showAddEditEnvelopePopup } from '../../store/actions/AddEditEnvelopeActions';

import Config from '../../core/config';
import EnvelopesMobile from './EnvelopesMobile';

import newEnvelopeIcon from './svg/new_envelope_icon.svg';

class Envelopes extends Component {
  defaultVisibleColumns = ['id', 'name', 'picture', 'note'];

  defaultSort = { sort: 'id' };

  state = { userVisibleColumns: [], sort: '', page: 1 };

  componentWillMount() {
    const { fetchEnvelopes } = this.props;
    if (!localStorage.getItem('envelopesColumn')) {
      localStorage.setItem('envelopesColumn', JSON.stringify(this.defaultVisibleColumns));
    }

    if (!localStorage.getItem('envelopesSort')) {
      localStorage.setItem('envelopesSort', JSON.stringify(this.defaultSort));
    }

    const sorting = JSON.parse(localStorage.getItem('envelopesSort'));
    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    if (Config.isAdmin()) {
      fetchEnvelopes(0, sorting);
    }

    this.setState({
      userVisibleColumns: JSON.parse(localStorage.getItem('envelopesColumn')),
      sort: sorting.sort || this.defaultSort.sort,
    });
  }

  toggleColumn = columnCode => {
    const { userVisibleColumns } = this.state;
    if (userVisibleColumns.includes(columnCode)) {
      const idx = _.indexOf(userVisibleColumns, columnCode);
      userVisibleColumns.splice(idx, 1);
    } else {
      userVisibleColumns.push(columnCode);
    }
    localStorage.setItem('envelopesColumn', JSON.stringify(userVisibleColumns));
    this.setState({ userVisibleColumns });
  };

  actionButton = () => {
    const { showAddEditEnvelopePopup } = this.props;
    return {
      buttonAction: showAddEditEnvelopePopup,
      svgIcon: newEnvelopeIcon,
      title: 'Добавить новый конверт',
    };
  };

  loadMore = () => {
    const { fetchEnvelopes, isLoadingFinished, isLoading } = this.props;

    if (isLoadingFinished || isLoading) {
      return false;
    }

    const { page } = this.state;
    const sorting = JSON.parse(localStorage.getItem('envelopesSort'));

    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    fetchEnvelopes(page * 10, sorting);
    const newPage = page + 1;
    this.setState({ page: newPage });
  };

  renderFilter = () => {
    const { userVisibleColumns } = this.state;
    return (
      <ul className="filter__list">
        <li
          onClick={() => this.toggleColumn('id')}
          className={`filter__list_item ${userVisibleColumns.includes('id') ? 'filter__list_item_selected' : ''}`}
        >
          ID
        </li>
        <li
          onClick={() => this.toggleColumn('name')}
          className={`filter__list_item ${userVisibleColumns.includes('name') ? 'filter__list_item_selected' : ''}`}
        >
          Имя
        </li>
        <li
          onClick={() => this.toggleColumn('picture')}
          className={`filter__list_item ${userVisibleColumns.includes('picture') ? 'filter__list_item_selected' : ''}`}
        >
          Изображение
        </li>
        <li
          onClick={() => this.toggleColumn('note')}
          className={`filter__list_item ${userVisibleColumns.includes('note') ? 'filter__list_item_selected' : ''}`}
        >
          Примечание
        </li>
      </ul>
    );
  };

  doSort = column => {
    const currentSorting = JSON.parse(localStorage.getItem('envelopesSort'));
    if (currentSorting.sort === column) column = `-${column}`;
    const { fetchEnvelopes } = this.props;
    const sorting = { sort: column };
    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }
    fetchEnvelopes(0, sorting);
    delete sorting.searchString;
    localStorage.setItem('envelopesSort', JSON.stringify(sorting));
    this.setState({
      sort: sorting.sort,
    });
  };

  render() {
    const { envelopes, isLoading, showAddEditEnvelopePopup } = this.props;
    const { userVisibleColumns, sort } = this.state;

    return (
      <div>
        {Config.isAdmin() && <BigTableActionsBar renderFilter={this.renderFilter} actionButton={this.actionButton()} />}
        {Config.isAdmin() && (
          <EnvelopesTable
            visibleColumns={userVisibleColumns}
            envelopes={envelopes}
            editEnvelopeMethod={showAddEditEnvelopePopup}
            sort={sort}
            doSort={this.doSort}
          />
        )}
        {!Config.isAdmin() && <EnvelopesList />}
        <LoadingSpinner loading={isLoading} color="#c3a94d" size={10} />
        <AddEditEnvelopePopup />
        <EnvelopesMobile editEnvelopeMethod={showAddEditEnvelopePopup} envelopes={envelopes} />
        <BottomScrollListener
          onBottom={() => {
            this.loadMore();
          }}
        />
      </div>
    );
  }
}

Envelopes.propTypes = {
  fetchEnvelopes: PropTypes.func.isRequired,
  showAddEditEnvelopePopup: PropTypes.func.isRequired,
  envelopes: PropTypes.arrayOf(envelopeTypes),
  isLoading: PropTypes.bool.isRequired,
};

Envelopes.defaultProps = {
  envelopes: [],
};

function mapStateToProps(state) {
  return {
    envelopes: state.EnvelopesReducer.toJS().envelopes,
    loadFrom: state.EnvelopesReducer.get('loadFrom'),
    isLoading: state.EnvelopesReducer.get('isLoading'),
    isLoadingFinished: state.EnvelopesReducer.get('isLoadingFinished'),
  };
}

export default connect(
  mapStateToProps,
  { fetchEnvelopes, showAddEditEnvelopePopup },
)(Envelopes);
