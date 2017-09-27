import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_newscontainer';

class PCIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <PCHeader />
        <PCNewsContainer />
        <PCFooter />
      </div>
    );
  }
}
export default PCIndex;
