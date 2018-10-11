let Organ = function (x, y, sprite, cuts)
{
    // essentially a super() call
    Phaser.Sprite.call(this, game, x, y, sprite);

    // angles are in radians in the range [0,2*PI)
    this.cuts = cuts;
    for (i = 0; i < this.cuts.length; i++)
    {
        this.cuts[i].intact = true;
    }

    this.free = false;

    this.cut_distance_tolerance = 40;
    this.cut_angle_tolerange = Math.PI/12;
    this.closest = new Phaser.Point(0,0);
};

// Here's where we do the extension
Organ.prototype = Object.create(Phaser.Sprite.prototype);

/* Collision checking between the user's swipe and the organ's cuttable points
 * if all of them are cut, return true
 * else, return false
 */
Organ.prototype.check_cut = function (cut)
{
    // check collision against every "collider" (maybe just check if the swipe is close enough and
    // the angle of the swipe is close to what's expected)
    //console.log(this.organ_name);
    if (this.free === false)
    {
        for (i = 0; i < this.cuts.length; i++)
        {
            cut_point = new Phaser.Point(this.cuts[i].x + this.position.x, this.cuts[i].y + this.position.y);

            // do the math
            cut_p = Phaser.Point.subtract(cut.end, cut.start);
            proj_p = Phaser.Point.subtract(cut_point, cut.start);
            final_p = Phaser.Point.project(proj_p, cut_p);
            this.closest = Phaser.Point.add(final_p, cut.start);
            this.closest.clampX(cut.left, cut.right).clampY(cut.top, cut.bottom);

            distance = Phaser.Point.distance(this.closest, cut_point);

            within_distance = (distance < this.cut_distance_tolerance);
            within_angle1 = (Phaser.Math.difference(
                Phaser.Math.normalizeAngle(cut.angle), 
                Phaser.Math.normalizeAngle(this.cuts[i].angle)
                ) < this.cut_angle_tolerange);
            within_angle2 = (Phaser.Math.difference(
                Phaser.Math.normalizeAngle(cut.angle), 
                Phaser.Math.normalizeAngle(this.cuts[i].angle + Math.PI)
                ) < this.cut_angle_tolerange);
            within_angle3 = (Phaser.Math.difference(
                Phaser.Math.normalizeAngle(cut.angle + Math.PI), 
                Phaser.Math.normalizeAngle(this.cuts[i].angle)
                ) < this.cut_angle_tolerange);
            within_angle4 = (Phaser.Math.difference(
                Phaser.Math.normalizeAngle(cut.angle + Math.PI), 
                Phaser.Math.normalizeAngle(this.cuts[i].angle + Math.PI)
                ) < this.cut_angle_tolerange);

            within_angle = within_angle1 || within_angle2 || within_angle3 || within_angle4;
            //console.log(within_distance+" "+within_angle1+" "+within_angle2+" "+within_angle3+" "+within_angle4);
            //console.log(within_distance + " " + within_angle);
                
            if (within_distance && within_angle)
            {
                //console.log("CUT");
                this.cuts[i].intact = false;
            }
        }
        this.free = true;
        for (i = 0; i < this.cuts.length; i++)
        {
            //console.log(this.cuts[i].intact);
            if (this.cuts[i].intact === true) 
            {
                this.free = false;
                break;
            }
        }
        if (this.free === true)
        {
            this.inputEnabled = true;
            this.input.enableDrag(true);
        }
    }
    //console.log(this.free);
    return this.free;
}

Organ.prototype.update = function ()
{
    //for(i = 0; i < this.cuts.length; i++)
    //{
    //    game.debug.geom(new Phaser.Circle(this.cuts[i].x + this.position.x, this.cuts[i].y + this.position.y, 2* this.cut_distance_tolerance), 'cyan', true);
    //    game.debug.geom((new Phaser.Line(0,0,0,0)).fromAngle(this.cuts[i].x + this.position.x, this.cuts[i].y + this.position.y, this.cuts[i].angle, 2*this.cut_distance_tolerance), 'cyan', true);
    //    game.debug.geom((new Phaser.Line(0,0,0,0)).fromAngle(this.cuts[i].x + this.position.x, this.cuts[i].y + this.position.y, Phaser.Math.normalizeAngle(this.cuts[i].angle + Math.PI), 2*this.cut_distance_tolerance), 'cyan', true);
    //}
};