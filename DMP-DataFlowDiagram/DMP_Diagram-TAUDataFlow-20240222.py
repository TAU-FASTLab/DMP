from graphviz import Digraph

# More nodes and edges as per your flowchart...

# Set graph attributes and render the image

# Let's create an improved version of the flowchart with better visual clarity and readability.

dot_improved = Digraph(comment='Improved Research Data Flow')

dot_improved.attr('node', fontsize='12')  # Adjust the number to increase or decrease the font size
dot_improved.attr('edge', fontsize='12') 

# Improved node labels and shapes for decisions and processes
# Rectangles for processes, Diamonds for decisions
dot_improved.attr('node', shape='rectangle')
dot_improved.node('A', 'Define Legal Basis for Data Processing', style='filled', fillcolor='lightblue')
dot_improved.node('X', 'DMP Not Needed', style='filled', fillcolor='lightgray')
dot_improved.node('V', 'Elaborate Balance Test', style='filled', fillcolor='#3DF4FA')
dot_improved.node('B', 'Define Legal Basis for Special Data Categories and the respective Balance test if applicable', style='filled', fillcolor='pink')
dot_improved.node('C', 'Define Data Controller', style='filled', fillcolor='green')
dot_improved.node('E', 'Define Joint Controller Agreement', style='filled', fillcolor='green')
dot_improved.node('F', 'Define Data Processor', style='filled', fillcolor='orange')
dot_improved.node('G', 'Elaborate Data Processing Agreement', style='filled', fillcolor='orange')
dot_improved.node('I', 'Elaborate Plan of Anonymization', style='filled', fillcolor='#FAC4F7')
dot_improved.node('J', 'Elaborate Consent Form', style='filled', fillcolor='#DFA4FA')
dot_improved.node('K', 'Elaborate Information Sheet', style='filled', fillcolor='#DFA4FA')
dot_improved.node('L', 'Elaborate Privacy Notice', style='filled', fillcolor='#987BFA')
dot_improved.node('N', 'Define DPIA', style='filled', fillcolor='#CDFD4B')
dot_improved.node('P', 'Elaborate Data Management Plan', style='filled', fillcolor='lightgreen')
dot_improved.node('Q', 'Elaborate Ethic Review', style='filled', fillcolor='lightgreen')
dot_improved.node('S', 'Authorized to Perform Research', style='filled', fillcolor='#97E0E8')
dot_improved.node('T', 'End: Perform Research', style='filled', fillcolor='#97E0E8')
dot_improved.node('Z', 'Perform Risk Assesment', style='filled', fillcolor='#CDFD4B')

dot_improved.attr('node', shape='diamond', style='filled', fillcolor='yellow', color='black')
dot_improved.node('U', 'Legal Basis is Legitimate Interest?')
dot_improved.node('W', 'Start: Research Involves Personal Data?')
dot_improved.node('Y', 'Special Categories of Personal Data?')
dot_improved.node('O', 'Approval from DPO')
dot_improved.node('R', 'Approval from Ethics Committee')
dot_improved.node('M', 'Need DPIA?')
dot_improved.node('D', 'Is Joint Controller Agreement Needed?')
dot_improved.node('H', 'Need Plan of Anonymization?')

# Adding the improved edges and directions
dot_improved.edge('W', 'X', label='No')
dot_improved.edge('W', 'A', label='Yes')
dot_improved.edge('A', 'U')
dot_improved.edge('B', 'C')
dot_improved.edge('V', 'Y')
dot_improved.edge('U', 'V', label='Yes')
dot_improved.edge('U', 'Y', label='No')
dot_improved.edge('Y', 'B', label='Yes')
dot_improved.edge('Y', 'C', label='No')
dot_improved.edge('C', 'D')
dot_improved.edge('D', 'E', label='Yes')
dot_improved.edge('D', 'F', label='No')
dot_improved.edge('E', 'F')
dot_improved.edge('F', 'G')
dot_improved.edge('G', 'H')
dot_improved.edge('H', 'I', label='Yes')
dot_improved.edge('H', 'J', label='No')
dot_improved.edge('I', 'J')
dot_improved.edge('J', 'K')
dot_improved.edge('K', 'L')
dot_improved.edge('L', 'Z')
dot_improved.edge('Z', 'M')
dot_improved.edge('M', 'N', label='Yes')
dot_improved.edge('M', 'P', label='No')
dot_improved.edge('O', 'N', xlabel='No')
dot_improved.edge('N', 'O')
dot_improved.edge('O', 'P', label='Yes')
#dot_improved.edge('O', 'T', label='No')
dot_improved.edge('P', 'Q')
dot_improved.edge('Q', 'R')
dot_improved.edge('R', 'S', label='Yes')
dot_improved.edge('R', 'Q', xlabel='No')
dot_improved.edge('S', 'T')

# Graph attributes for the improved version
#dot_improved.attr(rankdir='TB', size='12,12')
dot_improved.attr(rankdir='TB', size='12,12', ranksep='0.8', nodesep='0.5')


# Render the improved graph
improved_path = "./DMP-DataFlow-AIPrism-20240222.png"
dot_improved.render(improved_path, view=True)

# Return the path for the improved diagram
improved_path+'.png'



