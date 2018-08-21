<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;
use App\Models\TeamCulture;

/**
 * Class Manager
 *
 * @property int $id
 * @property int $department_id
 * @property int $work_review_frequency_id
 * @property int $stay_late_frequency_id
 * @property int $engage_team_frequency_id
 * @property int $development_opportunity_frequency_id
 * @property int $refuse_low_value_work_frequency_id
 * @property string $twitter_username
 * @property string $linkedin_username
 * @property int $user_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\User $user
 * @property \App\Models\Lookup\Department $department
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 * @property \App\Models\WorkEnvironment $work_environment
 * @property \App\Models\TeamCulture $team_culture
 * @property \App\Models\Lookup\Frequency $work_review_frequency
 * @property \App\Models\Lookup\Frequency $stay_late_frequency
 * @property \App\Models\Lookup\Frequency $engage_team_frequency
 * @property \App\Models\Lookup\Frequency $development_opportunity_frequency
 * @property \App\Models\Lookup\Frequency $refuse_low_value_work_frequency
 *
 * Localized Properties:
 * @property string $about_me
 * @property string $greatest_accomplishment
 * @property string $branch
 * @property string $division
 * @property string $position
 * @property string $work_experience
 * @property string $leadership_style
 * @property string $employee_learning
 * @property string $expectations
 */
class Manager extends BaseModel {

    use \Dimsav\Translatable\Translatable;

    public $translatedAttributes = ['about_me', 'greatest_accomplishmest', 'branch',
        'division', 'position', 'work_experience', 'education'];
    protected $casts = [
        'department_id' => 'int',
        'user_id' => 'int'
    ];
    protected $fillable = [
        'department_id',
        'twitter_username',
        'linkedin_username',
        'work_review_frequency_id',
        'stay_late_frequency_id',
        'engage_team_frequency_id',
        'development_opportunity_frequency_id',
        'refuse_low_value_work_frequency_id'
    ];
    protected $with = [
        'department',
        'work_review_frequency',
        'stay_late_frequency',
        'engage_team_frequency',
        'development_opportunity_frequency',
        'refuse_low_value_work_frequency'
    ];

    public function user() {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function department() {
        return $this->belongsTo(\App\Models\Lookup\Department::class);
    }

    public function job_posters() {
        return $this->hasMany(\App\Models\JobPoster::class);
    }

    public function work_environment() {
        return $this->hasOne(\App\Models\WorkEnvironment::class);
    }

    public function team_culture() {
        return $this->hasOne(\App\Models\TeamCulture::class);
    }
    /*
    * @property \App\Models\Lookup\Frequency $review_options
    * @property \App\Models\Lookup\Frequency $staylate
    * @property \App\Models\Lookup\Frequency $engage
    * @property \App\Models\Lookup\Frequency $opportunities
    * @property \App\Models\Lookup\Frequency $low_value_work_requests
    *
    * work_review_frequency
    * stay_late_frequency
    * engage_team_frequency
    * development_opportunity_frequency
    * refuse_low_value_work_frequency
    */
    public function work_review_frequency() {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    public function stay_late_frequency() {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    public function engage_team_frequency() {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    public function development_opportunity_frequency() {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    public function refuse_low_value_work_frequency() {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }
}