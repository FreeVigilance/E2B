import { Home } from '../src/js/components/Home'
import { shallow } from 'enzyme'
import { Results } from '@src/components/form/results';

describe('>>>H O M E --- Shallow Render REACT COMPONENTS',()=>{
    let wrapper

    beforeEach(()=>{
        wrapper = shallow(<Results/>)
        
    })

    it('+++ render the DUMB component', () => {
       expect(wrapper.length).toEqual(1)
    });
      
    it('+++ contains output', () => {
        expect(wrapper.find('input[placeholder="Output"]').prop('value')).toEqual(output)
    });
    
});