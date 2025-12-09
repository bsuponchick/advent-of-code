import { XYCoordinate } from '../utils/interfaces/coordinate';

export const calculateAreaBetweenCoordinates = (a: XYCoordinate, b: XYCoordinate): number => {
    
    const xDistance = Math.sqrt(Math.pow(a.x - b.x, 2)) + 1;
    const yDistance = Math.sqrt(Math.pow(a.y - b.y, 2)) + 1;
    
    return xDistance * yDistance;   
}