import React, { Component } from 'react';
import items from './data';
const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = { rooms: [], sortedRooms: [], featuredRooms: [], loading: true };
  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured);
    this.setState({ rooms, featuredRooms, sortedRooms: rooms, loading: false });
  }

  formatData = (items) => {
    let formatedItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return formatedItems;
  };

  getRoom = (slug) => {
    return this.state.rooms.find((item) => item.slug === slug);
  };

  setSortedRooms = (sortedRooms) => {
    this.setState({ sortedRooms });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          setSortedRooms: this.setSortedRooms,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
