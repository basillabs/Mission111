import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import StoryCard from './story/StoryCard';
import ViewPager from 'react-native-viewpager';

const tempData = [
  {
    topText: 'Innan himlen, jorden, eller någonting annat fanns till, så fanns Gud. Gud existerade före allt annat. Han har aldrig blivit skapad. Han har ingen början. Han har alltid funnits. Han kommer alltid finnas. Han kommer aldrig dö. Gud är ande. Han är överallt samtidigt. Han är med oss här just nu, men Han har också en tronsal i himlen där Han sitter på sin tron. Hans tron är som en eld. Hans kläder skiner. Guds ljus och härlighet skiner starkare än solen',
    bottomText: 'Before there was heaven, earth or anything else, there was God. God existed before everything else. He has never been created. He has no beginning. He has always existed. He will always exist. He will never die. God is Spirit. He is everywhere at the same time. He is here with us right now, but He also has a throne room in heaven where He sits on His throne. His throne is like a fire. His clothes are shining. The light and glory that shines from God is brighter than the sun.',
  },
  {
    topText: 'Gud är den som har skapat allt annat. Först skapade Gud änglarna. Han gjorde många, många änglar med stor visdom och styrka. Han placerade dem i himlen för att tjäna och lovsjunga Honom. Dag och natt lovsjunger de Honom. De bugar sig inför Honom och säger: ”Helig, helig, helig är Herren Gud, den Allsmäktige.” Den största av änglarna kallades Lucifer. Gud gav honom en position över alla andra änglar, som lovsångsledare.',
    bottomText: 'God is the one who created everything else. First, God created the angels. He created many, many angels with great wisdom and strength. He placed them in heaven to serve and worship Him. Day and night, they worship Him. They bow before Him saying, “Holy, holy, holy, is the Lord God Almighty.” The greatest angel was called Lucifer. God gave him a position over all the other angels, as worship leader.',
  },
  {
    topText: 'Innan himlen, jorden, eller någonting annat fanns till, så fanns Gud. Gud existerade före allt annat. Han har aldrig blivit skapad. Han har ingen början. Han har alltid funnits. Han kommer alltid finnas. Han kommer aldrig dö. Gud är ande. Han är överallt samtidigt. Han är med oss här just nu, men Han har också en tronsal i himlen där Han sitter på sin tron. Hans tron är som en eld. Hans kläder skiner. Guds ljus och härlighet skiner starkare än solen',
    bottomText: 'Before there was heaven, earth or anything else, there was God. God existed before everything else. He has never been created. He has no beginning. He has always existed. He will always exist. He will never die. God is Spirit. He is everywhere at the same time. He is here with us right now, but He also has a throne room in heaven where He sits on His throne. His throne is like a fire. His clothes are shining. The light and glory that shines from God is brighter than the sun.',
  },
  {
    topText: 'Gud är den som har skapat allt annat. Först skapade Gud änglarna. Han gjorde många, många änglar med stor visdom och styrka. Han placerade dem i himlen för att tjäna och lovsjunga Honom. Dag och natt lovsjunger de Honom. De bugar sig inför Honom och säger: ”Helig, helig, helig är Herren Gud, den Allsmäktige.” Den största av änglarna kallades Lucifer. Gud gav honom en position över alla andra änglar, som lovsångsledare.',
    bottomText: 'God is the one who created everything else. First, God created the angels. He created many, many angels with great wisdom and strength. He placed them in heaven to serve and worship Him. Day and night, they worship Him. They bow before Him saying, “Holy, holy, holy, is the Lord God Almighty.” The greatest angel was called Lucifer. God gave him a position over all the other angels, as worship leader.',
  },
];

class Story extends Component {
  constructor(props) {
    super(props);

    const ds = new ViewPager.DataSource({pageHasChanged: (r1, r2) => r1.text !== r2.text});
    this.state = {
      data: ds.cloneWithPages(tempData),
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.handleNavigate({
      type: 'pop',
      route: {key: 'pop'},
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onClick}
        >
          <Text>Back</Text>
        </TouchableHighlight>
        <ViewPager
          dataSource={this.state.data}
          renderPage={(data) => <StoryCard topText={data.topText} bottomText={data.bottomText} />}
        />
      </View>
    );
  }
}

Story.propTypes = {
  handleNavigate: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  button: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingVertical: 10,
  }
});

export default Story;