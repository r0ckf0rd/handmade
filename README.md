NEEDS WORK:

    1) -COMPLETE- Product Index CSS: Hovering over a parent li gives the child image a drop shadow

    2) After changing the shape of my state, from time to time, navigating to the / will throw errors
        - when at a product show page and navigating back to root
        - may have fixed it with a Protected Route
        - seems okay but needs more testing
        - errors are back after working on the product show page

    3) -COMPLETE- Long email addresses push up against DD border

    4) Error handing on the session form still doesn't activate a red focus/active on the trouble element

    5) -HACKY COMPLETE- Modal isn't perfectly centered, it's slightly to the right
        - I am using multiple divs, one at top: 50%, left: 50%; and the inner with an odd translation of ~(-11%, -7%);
        - .or class is translated something like %1000;

    6) Need to properly create horizontal lines that span 100vw
        - IDEA: create thin block element + border that has an id selector and goes 100%vw

    7) -COMPLETE- Product Index Divs (.item-box) need to actually link to product show page

    8) -COMPLETE- Navigating to ProductShow component from my ProductIndex breaks

    9) Can't get li opacity to stay at 1 on selected


NOTES: 

    1) I seem to hit a hiccup everytime I extract new information out of the backend. A helpful hint to myself:
        - It all goes back to the Model; Models have associations you can use to help extract extraneous data.
        - Data is fetched from the database in the controller and passed to a backend view, an api route that uses json.jbuilder
        - The api view needs to extract only the data we need from the full object (Protect your private data!)
        - Normal actions must be modified if we'll be receiving pieces of state that live in utilize different reducers
        - The reducers must be modified to listen (case statements) and extract data from that action
        - Verify state looks like you expect it too on several actions, if not every action related to those reducers
    
    2) 



